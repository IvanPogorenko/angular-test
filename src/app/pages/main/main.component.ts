import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

interface Education {
  institution: string
  degree: string
  period: string
  achievements: string[]
}

interface Experience {
  company: string
  position: string
  period: string
  technologies: string[]
  description: string,
  links: string[]
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  aboutMe = {
    name: "Погоренко Иван",
    title: "Frontend-разработчик",
    description:
      "Увлеченный разработчик с опытом создания современных веб-приложений. Специализируюсь на Angular, React и Node.js. Люблю решать сложные задачи и создавать качественный код.",
    skills: ["Angular", "TypeScript", "JavaScript", "HTML/CSS", "Node.js", "Git"],
  }

  education: Education[] = [
    {
      institution: "Томский Государственный Университет",
      degree: "Бакалавр компьютерных наук",
      period: "2021 - 2025",
      achievements: [
        "Красный диплом",
        'Призер англоязычной секции 10 Международной молодежной научной коференции 2023',
        'Участник 11 Международной молодежной научной конференции 2024',
      ],
    },
    {
      institution: "Онлайн-курсы Angular",
      degree: "Повышение квалификации",
      period: "2024 - 2025",
      achievements: [
        "Закончил онлайн школу разработчиков от компании CodeMasters по направлению Frontend-разработка",
        'Закончил онлайн-курс по Angular от компании Эволента',
      ],
    },
    {
      institution: "ИТМО",
      degree: "Магистрант",
      period: "2025 - 2027",
      achievements: ["Достижения в процессе"],
    }
  ]

  experience: Experience[] = [
    {
      company: "Pet-проект",
      position: "Full-stack",
      period: "2024 - 2025",
      technologies: ["Angular 15", "RxJS", "NGXS", "TypeScript", "REST API", "SCSS"],
      description: "Разрабатывал интернет-магазин медицинской одежды с интеграцией с Microsoft Office",
      links: ["https://github.com/IvanPogorenko/moonpie"]
    },
    {
      company: "Курсы",
      position: "Frontend",
      period: "2024-2025",
      technologies: [],
      description: "Разрабатывал два приложения: сервис по доставке пиццы и сайт с рецептами в качестве итоговых заданий курсов",
      links: ["https://github.com/IvanPogorenko/EvoCourse/tree/Final-Task", "https://github.com/IvanPogorenko/portfolio/tree/main/lab5"]
    }
  ]

}
