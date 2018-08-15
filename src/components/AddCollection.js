import React, { Component } from 'react';

import './AddCollection.css';

import WidthWrapper from './WidthWrapper.js';
import SystemBrowserLink from './SystemBrowserLink.js';
import Button from './Button.js';

const { ipcRenderer } = window.require('electron'); // use window to avoid webpack

export default class AddCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionName: '',
      collectionDirectory: undefined,
    };

    ipcRenderer.on('chose-collection-directory', this.handleIpcChoseCollectionDirectory);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('chose-collection-directory', this.handleIpcChoseCollectionDirectory);
  }

  handleNameChange = (e) => {
    this.setState({collectionName: e.target.value});
  };

  handleIpcChoseCollectionDirectory = (e, dir) => {
    this.setState({collectionDirectory: dir});
  };

  handleClickChooseCollectionDirectory = (e) => {
    e.preventDefault();
    ipcRenderer.send('choose-collection-directory');
  };

  handleAddCollection = () => {
    this.props.onAdd(this.state.collectionName, this.state.collectionDirectory);
  };

  render() {
    const { onExit } = this.props;

    return (
      <WidthWrapper>
        <div className="AddCollection-header header-font">
          Add Collection
        </div>
        <div className="AddCollection-below-header">
          <div>Your collection folder should have your media and subtitles named and organized the same as for a media player like <SystemBrowserLink href="https://kodi.wiki/view/Naming_video_files">Kodi</SystemBrowserLink> or <SystemBrowserLink href="https://support.plex.tv/articles/#cat-media-preparation">Plex</SystemBrowserLink>. But unlike those, movies and TV shows can be mixed in the same folder.</div>
          <br />
          <div><label>Display Name: <input style={{fontSize: 'inherit'}} value={this.state.collectionName} onChange={this.handleNameChange} placeholder="My Videos" /></label></div>
          <div>Folder: {this.state.collectionDirectory || <span><i>None selected</i></span>} <button onClick={this.handleClickChooseCollectionDirectory}>Choose Folder</button></div>
          <br />
          <div>
            <Button disabled={!this.state.collectionName || !this.state.collectionDirectory} onClick={this.handleAddCollection}>Add Collection</Button>&nbsp;
            <Button onClick={onExit}>Cancel</Button>
          </div>
          <div className="AddCollection-instructions">
          </div>
        </div>
      </WidthWrapper>
    );
  }
}