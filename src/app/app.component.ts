import { Component, NgZone } from '@angular/core';
import '/Users/I529989/Documents/SAP/23-luigi/container/public';
import { LuigiContainer } from '/Users/I529989/Documents/SAP/23-luigi/container/public';
import Events from '/Users/I529989/Documents/SAP/23-luigi/container/public';


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

    (document.querySelector('luigi-compound-container') as any).compoundConfig = this.compoundConfig;
    // this should not be needed but it seems to be so ! Uncommenting the line below the compound container never initializes !

    const container: LuigiContainer | null = document.querySelector('luigi-container');


    container?.addEventListener(Events.GET_CONTEXT_REQUEST, event => {
      const dataToSend = {
        someDataToSend: 'The year is 2023'
      }
      console.log('Data being sent from Core -> MF', dataToSend);
      (event as any).sendContextToMicrofrontend(dataToSend);
    });
    // console.log('test123', container?.viewurl, container?.updateContext({ text: 123 }))
    // // window.addEventListener('foo', () => {
    try {
      (document.querySelector('luigi-compound-container') as any).init()
    } catch (error) {
      console.log(error);
    }

  }
}
