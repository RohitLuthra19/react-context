import React from "react";
import axios from "axios";

import "./Main.css";
import Spinner from "../../components/Spinner/Spinner";

import * as types from "../../redux/categories/types";
import { Context } from "../../redux/categories/store";
import * as constants from "../../redux/categories/constants";

export class Main extends React.PureComponent {
  static contextType = Context;

  getSingleCategory = (categoryId, limit, page, isMore) => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = this.context;
    const url = `${constants.BASE_URL}/images/search?category_ids=${categoryId}&limit=${limit}&page=${page}`;

    dispatch({ type: types.GET_SINGLE_CATEGORY_REQUEST });

    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch({
          type: types.GET_SINGLE_CATEGORY_SUCCESS,
          data: response,
          isMore,
          page,
        });
      })
      .catch(() => dispatch({ type: types.GET_SINGLE_CATEGORY_FAILURE }));
  };

  render() {
    const [{ images, fetching }] = this.context;

    return (
      <div className="main">
        <div className="wrapper">
          {this.renderImages(images)}
          <Spinner
            left={"60%"}
            top={"60%"}
            fontSize={"3em"}
            visible={fetching}
          />
        </div>
        <div className="btn_wrapper">
          <button className="btn_more" onClick={this.handleMoreClick}>
            More
          </button>
        </div>
      </div>
    );
  }

  /* componentDidMount() {
    const [{ limit, page, activeCategory }] = this.context;
    console.log("activeCategory:", activeCategory);
    if (activeCategory !== -1) {
      this.getSingleCategory(activeCategory, limit, page, false);
    }
  } */

  /* componentDidUpdate(prevProps) {
    const [{ limit, page, activeCategory, images }] = this.context;
    if (activeCategory !== -1 && images.length === 0) {
      this.getSingleCategory(activeCategory, limit, page, false);
    }
  } */

  ///////////////////////////////////////////////////////////////////////
  //  RENDER METHODS
  ///////////////////////////////////////////////////////////////////////
  renderImages(images) {
    return images.map((item, i) => {
      return (
        <img
          key={item.id + i}
          src={item.url}
          width={450}
          height={400}
          alt={item.id}
          className="img"
        ></img>
      );
    });
  }

  ///////////////////////////////////////////////////////////////////////
  //  EVENT HANDLERS
  ///////////////////////////////////////////////////////////////////////
  handleMoreClick = () => {
    const [{ limit, page, activeCategory }] = this.context;

    console.log(page);
    this.getSingleCategory(activeCategory, limit, page + 1, true);
  };
}

export default Main;
