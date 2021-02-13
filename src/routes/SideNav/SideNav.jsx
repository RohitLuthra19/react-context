import React from 'react';
import "./SideNav.css";

import * as types from "../../redux/categories/types";
import {Context} from '../../redux/categories/store'
export class SideNav extends React.PureComponent {
    static contextType = Context

    render() {
      const [{items}]= this.context;

      return (
          <div className="side">
            <h2>Categories</h2>
            <div className="navbar">
              <ul>                  
             {this.renderCategories(items)}
              </ul>
            </div>
          </div>
      );
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderCategories(categories) {
      const [{activeCategory}, dispatch]= this.context;

      return categories.map((category, i) => {
        let style = (activeCategory === category.id) ? 'active_link' : '';
        return (<li className={style} key={category.id} onClick={() => dispatch({
          type: types.SELECT_CATEGORY,
          categoryId: category.id,
        })}>{category.name}</li>)
      })
    }
}

export default SideNav;