import { Footer, Navigation, Sidebar, SinglePlaylist } from "components";
import "styles/globalbakin.css";

function PlaylistPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <SinglePlaylist />
      </div>
      <Footer />
    </div>
  );
}

export { PlaylistPage };
