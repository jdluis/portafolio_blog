import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebaseConfig.ts";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    logEvent(analytics, 'screen_view' as string, {
      screen_name: 'About',
      screen_class: 'AboutPage'
    });
  }, []);

  return (
    <main>
      <h1>About</h1>
    </main>
  );
};

export default About;
