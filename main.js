document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const player = document.getElementById('player');

  let drawVideo = new UserVideo(ctx, player);
  drawVideo.init();
});

class UserVideo {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
  }

  init() {
    this.getVideo(this.ctx, this.player);
  }

  getVideo(ctx, player) {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(localMediaStream => {
        player.src = window.URL.createObjectURL(localMediaStream);
        player.play();
        this.drawCanvas(ctx, player);
      })
      .catch(err => {
        console.log(err)
      });
  }

  drawCanvas(ctx, video) {
    return setInterval(() => {
      ctx.drawImage(video, 0, 0, 800, 600);

      let pixels = ctx.getImageData(0, 0, 800, 600);

      pixels = this.rgbSplit(pixels);
      ctx.globalAlpha = 1;

      ctx.putImageData(pixels, 0, 0);
    }, 16);
  }

  rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i] = 255; // red
      pixels.data[i + 1] = 255 - pixels.data[i + 1]; // green
      pixels.data[i + 2] = 255 - pixels.data[i + 2]; // blue
    }

    return pixels;
  }
}