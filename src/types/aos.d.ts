declare module "aos" {
    interface AosOptions {
      duration?: number;
      once?: boolean;
      easing?: string;
      offset?: number;
      delay?: number;
    }
  
    const AOS: {
      init(options?: AosOptions): void;
    };
  
    export default AOS;
  }
  