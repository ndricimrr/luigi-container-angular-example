import { Component, NgZone } from '@angular/core';
import '@luigi-project/container';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-lui-component';
  public compoundConfig = {
    renderer: {
      use: 'grid',
      config: {
        columns: '1fr 1fr 1fr 2fr',
        layouts: [
          {
            minWidth: 0,
            maxWidth: 600,
            columns: '1fr',
            gap: 0
          },
          {
            minWidth: 600,
            maxWidth: 1024,
            columns: '1fr 1fr',
            gap: '30px'
          }
        ]
      }
    },
    children: [
      {
        viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
        context: {
          title: 'My Awesome Grid',
          description: 'Really awesome'
        },
        layoutConfig: {
          row: '1',
          column: '1 / -1'
        },
        eventListeners: [
          {
            source: 'input1',
            name: 'sendInput',
            action: 'update',
            dataConverter: (data: string) => {
              return 'new text: ' + data;
            }
          }
        ]
      },
      {
        id: 'input1',
        viewUrl: 'https://luigiwebcomponents.gitlab.io/util/input.js',
        context: {
          title: 'Some input',
          instant: true
        }
      },
    ]
  };

  constructor(private readonly zone: NgZone) {
  }

  ngAfterViewInit() {

  }
}
