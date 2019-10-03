import {Component, OnInit} from '@angular/core';
import {BoardMember} from '../../shared/models/board-member.model';
import {BOARD_MEMBERS} from '../../shared/constants/board-members.constant';

@Component({
  selector: 'app-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.scss']
})
export class BoardMembersComponent implements OnInit {
  boardMembers: BoardMember[] = BOARD_MEMBERS;

  constructor() {}

  ngOnInit() {}
}
