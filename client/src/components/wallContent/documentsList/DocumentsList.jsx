import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentItem from './documentItem/DocumentItem.jsx'

class DocumentsList extends Component {
  renderList() {
    const { documents } = this.props
    return documents.map((doc, index) => {
      return <li className='DocumentsList-Item' key={index}>
        <DocumentItem document={doc} />
      </li>
    });
  }
  render() {
    return <ul className={'DocumentsList'}>
      {this.renderList()}
    </ul>
  }
}

DocumentsList.propTypes = {
  children: PropTypes.element,
  documents: PropTypes.arrayOf(Object)
}
export default DocumentsList;