import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserBook} from '../../../../models/user-book';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit {

  @Input() review: UserBook;

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {}




}
