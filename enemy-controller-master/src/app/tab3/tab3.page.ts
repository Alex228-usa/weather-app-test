import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab3', 
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public fav;
  constructor(public alertController: AlertController) {
    this.fav = JSON.parse(localStorage.getItem('fav'));
  }

  async delete() {
    Swal.fire({
      icon: 'error',
      title: 'Failed delete!',
      text: 'Favorites are still empty please add via forecast!',
      confirmButtonColor: '#d33',
    })
    if (localStorage.length > 0 ) {
      Swal.fire({
        title: 'Are you sure?',
        text: "All data in favorites will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33', 
        confirmButtonText: 'Yes, just delete',
        cancelButtonText: 'no',
        reverseButtons: false
      }).then((result) => {
        if (result.value) {
          localStorage.clear();
          Swal.fire(
            {
              title: 'Successfully deleted',
              text: 'All data successfully deleted please pull to refresh the page.',
              icon: 'success',
              confirmButtonColor: '#28a745',
              cancelButtonColor: '#3085d6', 
            }
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            {
              title: 'Canceled',
              text: 'Not so lurd :)',
              icon: 'error',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#d33', 
            }
          )
        }
      })
    } 
  }

  doRefresh(event) {
    setTimeout(() => {
      this.fav = JSON.parse(localStorage.getItem('fav'));
      event.target.complete();
    }, 2000);
  }
}
