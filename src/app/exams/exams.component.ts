import { Component, OnInit } from '@angular/core';
import { iCollection } from '../interfaces/collection.interface';
import { CrudService } from '../services/crud.service';
import { AppService } from '../services/app.service';
import { LogService } from '../services/log.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  COLLECTIONS: iCollection[] = [];
  links = ['link1', 'link2']
  messages = [{ from: 'tho', subject: 'Hi', content: 'This is content' }, { from: 'tho', subject: 'Hi', content: 'This is content' }];
  isLoading: boolean = false;
  constructor(
    private crudService: CrudService,
    private appService: AppService,
    public authService: AuthService,
    private log: LogService
  ) { }

  ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.isLoading = true;
    this.COLLECTIONS = [];
    this.crudService.collectionsGet()
      .then((qSnap) => {
        qSnap.forEach(doc => {
          let COL = <iCollection>doc.data();
          this.COLLECTIONS.push(COL);
        })
        this.COLLECTIONS = this.appService.arraySortA2ZByProperty(this.COLLECTIONS, 'C_TITLE');
        if (this.log.isON) console.log(this.COLLECTIONS);
        this.isLoading = false;
      })
      .catch((err) => {
        if (this.log.isON) console.log(err);
        this.isLoading = false;
      })
  }

}
