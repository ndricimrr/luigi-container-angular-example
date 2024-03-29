import { Component, NgZone } from '@angular/core';
import { LuigiContainer, LuigiCompoundContainer } from '/Users/I529989/Documents/SAP/sapluigi/container/public';
import Events from '/Users/I529989/Documents/SAP/sapluigi/container/public';


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

    console.log(container)
    container?.addEventListener(Events.GET_CONTEXT_REQUEST, event => {
      const dataToSend = {
        someDataToSend: 'The year is 2023'
      }
      console.log('Data being sent from Core -> MF', dataToSend);
      (event as any).sendContextToMicrofrontend(dataToSend);
    });



    const compoundContainer: LuigiCompoundContainer | null = document.querySelector('luigi-compound-container');

    setTimeout(() => {
      compoundContainer?.init()

      container?.init();

    }, 5000);



  }
}
