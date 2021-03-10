class MediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;
  isActive: boolean;
  container: HTMLElement;

  constructor(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.isActive = true;
    this.initPlayer();
    this.initPlugins();
  }

  initPlayer() {
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  private initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run(this);
    });
  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  isPaused() {
    return this.media.paused;
  }

  toggleSound() {
    this.media.muted = !this.media.muted;
  }

  mute() {
    this.media.muted = true;
  }

  isMute() {
    return this.media.muted;
  }
}

export default MediaPlayer;
