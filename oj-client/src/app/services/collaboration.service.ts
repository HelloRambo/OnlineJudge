import { Injectable } from '@angular/core';
import {del} from 'selenium-webdriver/http';

declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    console.log('location', window.location.origin);
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId' + sessionId });
/*    this.collaborationSocket = io({ query: 'message=' + '123'});*/

    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on('message', message => {
      console.log('received' + message);
    });
    this.collaborationSocket.on('return2', (message) => {
      console.log('return2');
    });
  }

  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

}
