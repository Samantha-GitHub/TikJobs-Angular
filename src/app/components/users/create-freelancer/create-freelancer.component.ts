import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Language } from 'src/app/interfaces/language';
import { Skill } from 'src/app/interfaces/skill';
import { LanguagesService } from 'src/app/services/languages.service';
import { SkillsService } from 'src/app/services/skills.service';
import { TbiLanguagessUsuarioService } from 'src/app/services/tbi-languages-usuario.service';
import { TbiSkillsUsuarioService } from 'src/app/services/tbi-skills-usuario.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-freelancer',
  templateUrl: './create-freelancer.component.html',
  styleUrls: ['./create-freelancer.component.scss'],
})
export class CreateFreelancerComponent implements OnInit {
  active = 1;
  files;
  skills: Skill[];
  languages: Language[];
  formularioFreelancer: FormGroup;

  constructor(
    private router: Router,
    private skillService: SkillsService,
    private languageService: LanguagesService,
    private freelancerService: UsersService,
    private tbiSkillFreelance: TbiSkillsUsuarioService,
    private tbiLanguageFreelance: TbiLanguagessUsuarioService
  ) {
    // FORMULARIO FREELANCER
    this.formularioFreelancer = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/),
      ]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      gender: new FormControl(),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      streetName: new FormControl(),
      website: new FormControl(),
      image: new FormControl(),
      video: new FormControl(),
      job_title: new FormControl('', [Validators.required]),
      profile: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      skill: new FormControl(),
      language: new FormControl(),
    });
  }

  async ngOnInit(): Promise<any> {
    try {
      this.skills = await this.skillService.getAll();
      // console.log(this.skills);
    } catch (error) {
      console.log(error);
    }
    try {
      this.languages = await this.languageService.getAll();
      // console.log(this.languages);
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmitFreelancer(): Promise<any> {
    try {
      console.log(this.formularioFreelancer.value);

      const { language, skill } = this.formularioFreelancer.value;


      const freelance = await this.freelancerService.create(
        this.formularioFreelancer.value
      );
      console.log(freelance);

      if (freelance.insertId) {
        // A Language
        language.forEach(async (oneLanguage) => {
          const lang = await this.tbiLanguageFreelance.create({
            language: oneLanguage,
            freelance: freelance.insertId,
          });
          console.log('yo this is lang', lang);
        });

        // A skill
        skill.forEach(async (oneSkill) => {
          const ski = await this.tbiSkillFreelance.create({
            skill: oneSkill,
            freelance: freelance.insertId,
          });
          console.log('yo this is skills', ski);
        });
      }
      // ROUTING TO FORM
      this.router.navigate(['/loginfreelance']);
    } catch (error) {
      console.log(error);
    }
  }


}
