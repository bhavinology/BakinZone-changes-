import { useData } from "contexts";
import "./videos.css";
import { VideoCard } from "./VideoCard";
import { Outlet } from "react-router-dom";

function Videos() {
  const { state, dispatch, setSearchBarText } = useData();

  const dispatchHandler = (category) => {
    dispatch({ type: "CATEGORY", payload: { category } });
  };

  function getFilteredVideos() {
    let filteredVideos = [];
    if (state.category === "All") filteredVideos = state.videos;
    else
      filteredVideos = state.videos.filter(
        (perVideo) => perVideo.category === state.category
      );

    if (state.searchText !== "")
      filteredVideos = state.videos.filter(
        (video) =>
          video.title.toLowerCase().includes(state.searchText.toLowerCase()) ||
          video.category.toLowerCase().includes(state.searchText.toLowerCase())
      );

    return filteredVideos;
  }

  return (
    <>
      <div>
        <div className="categories">
          {state.categories.map((category) => (
            <span
              className={`chip category-chip ${
                category.categoryName === state.category
                  ? "active-category"
                  : null
              }`}
              key={category._id}
              onClick={() => dispatchHandler(category.categoryName)}
            >
              {category.categoryName}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-row-center">
        {getFilteredVideos().length > 0 ? (
          <div className="videos-container">
            {getFilteredVideos().map((video) => (
              <VideoCard video={video} key={video._id}></VideoCard>
            ))}
          </div>
        ) : (
          <div className="margin-container flex-column-center padding-top-8">
            {`No Search Results found for "${state.searchText}"`}
            <button
              className="btn btn-primary no-link-decoration inline-flex-center"
              onClick={() => {
                setSearchBarText("");
                dispatch({
                  type: "SET_SEARCH_TEXT",
                  payload: { searchText: "" },
                });
              }}
            >
              Explore
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export { Videos };
