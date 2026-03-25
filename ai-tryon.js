// ===== THRIFTX AI VIRTUAL TRY-ON ENGINE =====
// Uses MediaPipe Pose + Selfie Segmentation for body-aware garment overlay

const TryOnEngine = (() => {
  let pose = null;
  let selfieSegmentation = null;
  let modelsLoaded = false;
  let modelsLoading = false;
  let personImageData = null;
  let personImageEl = null;
  let cameraStream = null;
  let animFrame = null;
  let currentOutfitSrc = null;
  let resultCanvas = null;
  let poseResults = null;
  let cameraMode = false;

  // ---- Model Loading ----
  async function loadModels() {
    if (modelsLoaded) return true;
    if (modelsLoading) {
      await new Promise(r => { const iv = setInterval(() => { if (!modelsLoading) { clearInterval(iv); r(); } }, 300); });
      return modelsLoaded;
    }
    modelsLoading = true;
    try {
      if (typeof Pose === 'undefined' || typeof SelfieSegmentation === 'undefined') {
        modelsLoading = false;
        modelsLoaded = false;
        return false;
      }
      pose = new Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}` });
      pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
      pose.onResults(r => { poseResults = r; });

      selfieSegmentation = new SelfieSegmentation({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${f}` });
      selfieSegmentation.setOptions({ modelSelection: 1, selfieMode: false });

      modelsLoaded = true;
      modelsLoading = false;
      return true;
    } catch (e) {
      console.warn('MediaPipe load error:', e);
      modelsLoading = false;
      modelsLoaded = false;
      return false;
    }
  }

  // ---- Process person image and detect pose ----
  async function detectPose(imgEl) {
    if (!pose) return null;
    try {
      await pose.send({ image: imgEl });
      return poseResults;
    } catch (e) {
      return null;
    }
  }

  // ---- Canvas drawing helpers ----
  function imageToCanvas(imgEl, maxW = 600, maxH = 700) {
    const c = document.createElement('canvas');
    const ratio = Math.min(maxW / imgEl.naturalWidth, maxH / imgEl.naturalHeight, 1);
    c.width = imgEl.naturalWidth * ratio;
    c.height = imgEl.naturalHeight * ratio;
    const ctx = c.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, c.width, c.height);
    return c;
  }

  // ---- Garment overlay with pose-aware placement ----
  async function overlayGarment(personCanvas, garmentSrc, landmarks) {
    const out = document.createElement('canvas');
    out.width = personCanvas.width;
    out.height = personCanvas.height;
    const ctx = out.getContext('2d');

    // Draw person
    ctx.drawImage(personCanvas, 0, 0);

    // Load garment
    const garment = await new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = garmentSrc;
    });

    const W = out.width;
    const H = out.height;

    let gx, gy, gw, gh;

    if (landmarks && landmarks.length > 0) {
      // MediaPipe pose landmark indices:
      // 11 = left shoulder, 12 = right shoulder, 23 = left hip, 24 = right hip
      const lShoulder = landmarks[11];
      const rShoulder = landmarks[12];
      const lHip = landmarks[23];
      const rHip = landmarks[24];

      if (lShoulder && rShoulder && lHip && rHip &&
          lShoulder.visibility > 0.4 && rShoulder.visibility > 0.4) {
        const lsx = lShoulder.x * W, lsy = lShoulder.y * H;
        const rsx = rShoulder.x * W, rsy = rShoulder.y * H;
        const lhx = lHip.x * W, lhy = lHip.y * H;
        const rhx = rHip.x * W, rhy = rHip.y * H;

        const shoulderW = Math.abs(rsx - lsx);
        const torsoH = Math.abs(((lhy + rhy) / 2) - ((lsy + rsy) / 2));
        const centerX = (lsx + rsx) / 2;
        const topY = Math.min(lsy, rsy);

        gw = shoulderW * 2.1;
        gh = (garment.height / garment.width) * gw;
        // Ensure the garment covers from shoulders to at least hip level
        if (torsoH > 0 && gh < torsoH * 1.3) {
          gh = torsoH * 1.4;
          gw = (garment.width / garment.height) * gh;
        }
        gx = centerX - gw / 2;
        gy = topY - gh * 0.08;
      } else {
        // Fallback: center on canvas
        gw = W * 0.72;
        gh = (garment.height / garment.width) * gw;
        gx = (W - gw) / 2;
        gy = H * 0.12;
      }
    } else {
      // Fallback dimensions
      gw = W * 0.72;
      gh = (garment.height / garment.width) * gw;
      gx = (W - gw) / 2;
      gy = H * 0.12;
    }

    // Draw garment with realistic blending
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.88;
    ctx.drawImage(garment, gx, gy, gw, gh);
    ctx.restore();

    // Subtle vignette for polish
    const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    return out;
  }

  // ---- Public API ----
  return {
    async init() {
      return await loadModels();
    },

    setPersonImage(imgEl) {
      personImageEl = imgEl;
      personImageData = imageToCanvas(imgEl);
    },

    setOutfit(src) {
      currentOutfitSrc = src;
    },

    async generateTryOn(outputCanvas) {
      if (!personImageData || !currentOutfitSrc) return false;

      const W = personImageData.width;
      const H = personImageData.height;
      outputCanvas.width = W;
      outputCanvas.height = H;
      const ctx = outputCanvas.getContext('2d');

      // Step 1: Show person
      ctx.drawImage(personImageData, 0, 0);

      // Step 2: Try pose detection
      let landmarks = null;
      if (modelsLoaded && pose) {
        try {
          await pose.send({ image: personImageData });
          if (poseResults && poseResults.poseLandmarks) {
            landmarks = poseResults.poseLandmarks;
          }
        } catch (e) { /* silently use fallback */ }
      }

      // Step 3: Overlay garment
      try {
        const resultC = await overlayGarment(personImageData, currentOutfitSrc, landmarks);
        ctx.drawImage(resultC, 0, 0, W, H);
        return true;
      } catch (e) {
        console.warn('Garment overlay failed:', e);
        return false;
      }
    },

    async startCamera(videoEl, previewCanvas) {
      try {
        if (cameraStream) this.stopCamera();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 720 } },
          audio: false
        });
        cameraStream = stream;
        videoEl.srcObject = stream;
        await new Promise(res => { videoEl.onloadedmetadata = res; });
        await videoEl.play();
        cameraMode = true;
        this._startCameraLoop(videoEl, previewCanvas);
        return true;
      } catch (e) {
        console.warn('Camera error:', e);
        return false;
      }
    },

    _startCameraLoop(videoEl, previewCanvas) {
      const ctx = previewCanvas.getContext('2d');
      const loop = async () => {
        if (!cameraMode || !cameraStream) return;
        previewCanvas.width = videoEl.videoWidth || 640;
        previewCanvas.height = videoEl.videoHeight || 720;
        ctx.save();
        ctx.translate(previewCanvas.width, 0);
        ctx.scale(-1, 1); // Mirror
        ctx.drawImage(videoEl, 0, 0);
        ctx.restore();

        if (currentOutfitSrc) {
          let landmarks = null;
          if (modelsLoaded && pose) {
            try {
              // Create temp canvas with mirrored frame
              const tmpC = document.createElement('canvas');
              tmpC.width = previewCanvas.width;
              tmpC.height = previewCanvas.height;
              const tctx = tmpC.getContext('2d');
              tctx.save(); tctx.translate(tmpC.width, 0); tctx.scale(-1, 1);
              tctx.drawImage(videoEl, 0, 0); tctx.restore();
              await pose.send({ image: tmpC });
              if (poseResults && poseResults.poseLandmarks) {
                landmarks = poseResults.poseLandmarks;
              }
            } catch (e) { /* skip */ }
          }
          try {
            const garment = await new Promise((res, rej) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => res(img);
              img.onerror = rej;
              img.src = currentOutfitSrc;
            });
            const W = previewCanvas.width, H = previewCanvas.height;
            let gx, gy, gw, gh;
            if (landmarks && landmarks[11] && landmarks[12] && landmarks[11].visibility > 0.4) {
              const lsx = (1 - landmarks[11].x) * W, lsy = landmarks[11].y * H;
              const rsx = (1 - landmarks[12].x) * W, rsy = landmarks[12].y * H;
              const lhx = (1 - landmarks[23].x) * W, lhy = landmarks[23].y * H;
              const rhx = (1 - landmarks[24].x) * W, rhy = landmarks[24].y * H;
              const shoulderW = Math.abs(rsx - lsx);
              const torsoH = Math.abs(((lhy + rhy) / 2) - ((lsy + rsy) / 2));
              const centerX = (lsx + rsx) / 2;
              gw = shoulderW * 2.1;
              gh = (garment.height / garment.width) * gw;
              if (torsoH > 0 && gh < torsoH * 1.3) { gh = torsoH * 1.4; gw = (garment.width / garment.height) * gh; }
              gx = centerX - gw / 2;
              gy = Math.min(lsy, rsy) - gh * 0.08;
            } else {
              gw = W * 0.65;
              gh = (garment.height / garment.width) * gw;
              gx = (W - gw) / 2;
              gy = H * 0.15;
            }
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.drawImage(garment, gx, gy, gw, gh);
            ctx.restore();
          } catch (e) { /* skip garment */ }
        }
        animFrame = requestAnimationFrame(loop);
      };
      animFrame = requestAnimationFrame(loop);
    },

    captureFromCamera(videoEl, outputCanvas) {
      const W = videoEl.videoWidth || 640;
      const H = videoEl.videoHeight || 720;
      outputCanvas.width = W;
      outputCanvas.height = H;
      const ctx = outputCanvas.getContext('2d');
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoEl, 0, 0);
      ctx.restore();
      const tmp = document.createElement('canvas');
      tmp.width = W; tmp.height = H;
      tmp.getContext('2d').drawImage(outputCanvas, 0, 0);
      const img = new Image();
      img.onload = () => this.setPersonImage(img);
      img.src = tmp.toDataURL('image/jpeg', 0.9);
    },

    stopCamera() {
      cameraMode = false;
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
      }
    },

    downloadResult(canvas) {
      const a = document.createElement('a');
      a.download = 'thriftx-tryon.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    },

    isLoaded() { return modelsLoaded; }
  };
})();
