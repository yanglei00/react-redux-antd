import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../../utils/constants';
import './style.scss';

function ShowPage() {
  return (
    <div className="ShowPage">
      {menuItems.map((item, index) =>
        <Link to={item.url} key={index}><div className="pages">{item.title}</div></Link>
      )}
    </div>
  );
}

export default ShowPage;