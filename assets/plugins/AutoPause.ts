import MediaPlayer from "../MediaPlayer";

class AutoPause {
  private threshold: number;
  player: MediaPlayer;

  constructor() {
    this.threshold = 0.25;
  }

  run(player: MediaPlayer) {
    this.player = player;
    // Para crear un observador del video
    // 1º arg: funcion que controla al video
    // 2º arg: parametros en pantalla que determinan cuando llamar al 1ºarg
    const observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold,
    });

    observer.observe(this.player.media);
    document.addEventListener("visibilitychange", this.handlerVisibilityChange);
  }

  //entries: lista de objetos que esta observando (en este caso solo observamos a player.media)
  private handlerIntersection = (entries: IntersectionObserverEntry[]) => {
    console.log("intersection observer");
    const entry = entries[0];

    const isVisible = entry.intersectionRatio >= this.threshold;

    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  };

  //Para parar el video cuando cambiemos de pestaña del navegador
  private handlerVisibilityChange = () => {
    const isVisible = document.visibilityState === "visible";
    if (isVisible && this.player.isActive) {
      this.player.play();
    } else {
      this.player.pause();
    }
  };
}

export default AutoPause;
