import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentModel } from './models/comment.model';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Comments';
  comments: CommentModel[] = [
    {
      userName: 'Tom',
      text: 'hi',
      date: new Date(Date.now()),
      childrenComments: [
        {
          userName: 'Alex',
          text: 'HELLO',
          date: new Date(Date.now()),
          childrenComments: [
            {
              userName: 'Andriy',
              text: 'HELLO',
              date: new Date(Date.now()),
              childrenComments: [
                {
                  userName: 'Andriy',
                  text: 'HELLO',
                  date: new Date(Date.now()),
                  childrenComments: [
                    {
                      userName: 'Andriy',
                      text: 'HELLO',
                      date: new Date(Date.now()),
                      childrenComments: [
                        {
                          userName: 'Andriy',
                          text: 'HELLO',
                          date: new Date(Date.now()),
                          childrenComments: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          userName: 'Ivan',
          text: 'FF',
          date: new Date(Date.now()),
          childrenComments: [],
        },
        {
          userName: 'Oleg',
          text: 'gg',
          date: new Date(Date.now()),
          childrenComments: [],
        },
      ],
    },
    {
      userName: 'Ben',
      text: 'hello',
      date: new Date(Date.now()),
      childrenComments: [
        {
          userName: 'Stepan',
          text: 'hi',
          date: new Date(Date.now()),
          childrenComments: [
            {
              userName: 'Andriy',
              text: 'HELLO',
              date: new Date(Date.now()),
              childrenComments: [],
            },
          ],
        },
        {
          userName: 'Petro',
          text: 'qq',
          date: new Date(Date.now()),
          childrenComments: [],
        },
      ],
    },
    {
      userName: 'Max',
      text: 'hi',
      date: new Date(Date.now()),
      childrenComments: [
        {
          userName: 'Andriy',
          text: 'HELLO',
          date: new Date(Date.now()),
          childrenComments: [
            {
              userName: 'Andriy',
              text: 'HELLO',
              date: new Date(Date.now()),
              childrenComments: [],
            },
          ],
        },
      ],
    },
  ];
}
