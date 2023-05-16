import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { url } from 'src/commonurl/commonurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-arbitrage-form',
  templateUrl: './arbitrage-form.component.html',
  styleUrls: ['./arbitrage-form.component.scss'],
})

export class ArbitrageFormComponent implements OnInit{
  // public url = url.arburl;
  ngOnInit() {
    if(!window.localStorage.getItem('token')) this.router.navigateByUrl('/login');
  }
  public user_id = window.localStorage.getItem('userId');
  public user_email = window.localStorage.getItem('userEmail');
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      mainModel: this.model,
    },
  };

  fields: FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: [
      {
        templateOptions: { label: 'Step 1' },
        fieldGroup: [
          {
            key: 'id_number',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'South African ID number',
              required: true,
            },
          },
          {
            key: 'res_country',
            type: 'select',
            templateOptions: {
              label: 'Select country of residence',
              options: [
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Algeria', value: 'algeria' },
                { label: 'Angola', value: 'angola' },
                { label: 'Benin', value: 'Benin' },
                { label: 'Burkina Faso', value: 'Burkina Faso' },
                { label: 'Burundi', value: 'Burundi' },
                { label: 'Cameroon', value: 'Cameroon' },
                { label: 'Cape Verde', value: 'Cape Verde' },
                { label: 'Central African Republic', value: 'Central African Republic' },
                { label: 'Chad', value: 'Chad' },
                { label: 'Comoros', value: 'Comoros' },
                { label: 'Congo - Brazzaville', value: 'Congo - Brazzaville' },
                { label: 'Congo - Kinshasa', value: 'Congo - Kinshasa' },
                { label: 'Côte d’Ivoire', value: 'ivory-coast' },
                { label: 'Djibouti', value: 'Djibouti' },
                { label: 'Egypt', value: 'Egypt' },
                { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
                { label: 'Eritrea', value: 'Eritrea' },
                { label: 'Ethiopia', value: 'Ethiopia' },
                { label: 'Gabon', value: 'Gabon' },
                { label: 'Gambia', value: 'Gambia' },
                { label: 'Ghana', value: 'Ghana' },
                { label: 'Guinea', value: 'Guinea' },
                { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
                { label: 'Kenya', value: 'Kenya' },
                { label: 'Lesotho', value: 'Lesotho' },
                { label: 'Liberia', value: 'Liberia' },
                { label: 'Libya', value: 'Libya' },
                { label: 'Madagascar', value: 'Madagascar' },
                { label: 'Malawi', value: 'Malawi' },
                { label: 'Mali', value: 'Mali' },
                { label: 'Mauritania', value: 'Mauritania' },
                { label: 'Mauritius', value: 'Mauritius' },
                { label: 'Mayotte', value: 'Mayotte' },
                { label: 'Morocco', value: 'Morocco' },
                { label: 'Mozambique', value: 'Mozambique' },
                { label: 'Namibia', value: 'Namibia' },
                { label: 'Niger', value: 'Niger' },
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'Rwanda', value: 'Rwanda' },
                { label: 'Réunion', value: 'Réunion' },
                { label: 'Saint Helena', value: 'Saint Helena' },
                { label: 'Senegal', value: 'Senegal' },
                { label: 'Seychelles', value: 'Seychelles' },
                { label: 'Sierra Leone', value: 'Sierra Leone' },
                { label: 'Somalia', value: 'Somalia' },
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Sudan', value: 'Sudan' },
                { label: 'Swaziland', value: 'Swaziland' },
                { label: 'São Tomé and Príncipe', value: 'São Tomé and Príncipe' },
                { label: 'Tanzania', value: 'Tanzania' },
                { label: 'Togo', value: 'Togo' },
                { label: 'Tunisia', value: 'Tunisia' },
                { label: 'Uganda', value: 'Uganda' },
                { label: 'Western Sahara', value: 'Western Sahara' },
                { label: 'Zambia', value: 'Zambia' },
                { label: 'Botswana', value: 'Zimbabwe' },
              ],
              required: true,
            },
          },
          {
            key: 'res_status',
            type: 'select',
            templateOptions: {
              label: 'Residence Status',
              options: [
                { label: 'SA Resident - Local', value: 'sa-resident-local' },
                { label: 'SA Resident - Temporarily Abroad', value: 'sa-resident-temporarily-abroad' },
                { label: 'SA Immigrant Non-resident', value: 'sa-immigrant-non-resident' },
                { label: 'Non-resident Foreigner', value: 'non-resident-foreigner' },
                { label: 'Foreign National Temporarily Residing in SA', value: 'foreign-national-temporarily-residing-sa' },
              ],
              required: true,
            },
          },
          {
            key: 'addi_citizenships_status',
            type: 'select',
            templateOptions: {
              label: 'Do you have any additional citizenship?',
              options: [
                { label: 'Yes', value: 1 },
                { label: 'No', value: 0 },
              ],
              required: true,
            },
          },
          {
            key: 'addi_citizenships',
            type: 'select',
            templateOptions: {
              label: 'Additional Country',
              options: [
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Algeria', value: 'algeria' },
                { label: 'Angola', value: 'angola' },
                { label: 'Benin', value: 'Benin' },
                { label: 'Burkina Faso', value: 'Burkina Faso' },
                { label: 'Burundi', value: 'Burundi' },
                { label: 'Cameroon', value: 'Cameroon' },
                { label: 'Cape Verde', value: 'Cape Verde' },
                { label: 'Central African Republic', value: 'Central African Republic' },
                { label: 'Chad', value: 'Chad' },
                { label: 'Comoros', value: 'Comoros' },
                { label: 'Congo - Brazzaville', value: 'Congo - Brazzaville' },
                { label: 'Congo - Kinshasa', value: 'Congo - Kinshasa' },
                { label: 'Côte d’Ivoire', value: 'ivory-coast' },
                { label: 'Djibouti', value: 'Djibouti' },
                { label: 'Egypt', value: 'Egypt' },
                { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
                { label: 'Eritrea', value: 'Eritrea' },
                { label: 'Ethiopia', value: 'Ethiopia' },
                { label: 'Gabon', value: 'Gabon' },
                { label: 'Gambia', value: 'Gambia' },
                { label: 'Ghana', value: 'Ghana' },
                { label: 'Guinea', value: 'Guinea' },
                { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
                { label: 'Kenya', value: 'Kenya' },
                { label: 'Lesotho', value: 'Lesotho' },
                { label: 'Liberia', value: 'Liberia' },
                { label: 'Libya', value: 'Libya' },
                { label: 'Madagascar', value: 'Madagascar' },
                { label: 'Malawi', value: 'Malawi' },
                { label: 'Mali', value: 'Mali' },
                { label: 'Mauritania', value: 'Mauritania' },
                { label: 'Mauritius', value: 'Mauritius' },
                { label: 'Mayotte', value: 'Mayotte' },
                { label: 'Morocco', value: 'Morocco' },
                { label: 'Mozambique', value: 'Mozambique' },
                { label: 'Namibia', value: 'Namibia' },
                { label: 'Niger', value: 'Niger' },
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'Rwanda', value: 'Rwanda' },
                { label: 'Réunion', value: 'Réunion' },
                { label: 'Saint Helena', value: 'Saint Helena' },
                { label: 'Senegal', value: 'Senegal' },
                { label: 'Seychelles', value: 'Seychelles' },
                { label: 'Sierra Leone', value: 'Sierra Leone' },
                { label: 'Somalia', value: 'Somalia' },
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Sudan', value: 'Sudan' },
                { label: 'Swaziland', value: 'Swaziland' },
                { label: 'São Tomé and Príncipe', value: 'São Tomé and Príncipe' },
                { label: 'Tanzania', value: 'Tanzania' },
                { label: 'Togo', value: 'Togo' },
                { label: 'Tunisia', value: 'Tunisia' },
                { label: 'Uganda', value: 'Uganda' },
                { label: 'Western Sahara', value: 'Western Sahara' },
                { label: 'Zambia', value: 'Zambia' },
                { label: 'Botswana', value: 'Zimbabwe' },
              ],
            },
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.addi_citizenships_status) {
                return formState.mainModel.addi_citizenships_status !== 1
              }
              return true;
            },
          },
          {
            key: 'title',
            type: 'select',
            templateOptions: {
              label: 'Title',
              options: [
                { label: 'Mr.', value: 'Mr' },
                { label: 'Miss', value: 'Miss' },
                { label: 'Mrs.', value: 'Mrs' },
                { label: 'Ms.', value: 'Ms' },
                { label: 'Prof.', value: 'Prof' },
                { label: 'Dr.', value: 'Dr' },
              ],
              required: true,
            },
          },
          {
            key: 'first_name',
            type: 'input',
            templateOptions: {
              label: 'Legal first name',
              required: true,
            },
          },
          {
            key: 'last_name',
            type: 'input',
            templateOptions: {
              label: 'Legal last name',
              required: true,
            },
          },
          {
            key: 'tax_number',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'SARS tax number',
              required: true,
            },
          },
          {
            key: 'juristrictions',
            type: 'select',
            templateOptions: {
              label: 'In how many jurisdictions are you a tax resident other than South Africa?',
              options: [
                { label: '0', value: 0 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
              ],
              required: true,
            },
          },
          // When VALUE 1 selected
          {
            key: 'juristrictions_1_country',
            type: 'select',
            templateOptions: {
              label: 'Additional Country',
              options: [
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Algeria', value: 'algeria' },
                { label: 'Angola', value: 'angola' },
                { label: 'Benin', value: 'Benin' },
                { label: 'Burkina Faso', value: 'Burkina Faso' },
                { label: 'Burundi', value: 'Burundi' },
                { label: 'Cameroon', value: 'Cameroon' },
                { label: 'Cape Verde', value: 'Cape Verde' },
                { label: 'Central African Republic', value: 'Central African Republic' },
                { label: 'Chad', value: 'Chad' },
                { label: 'Comoros', value: 'Comoros' },
                { label: 'Congo - Brazzaville', value: 'Congo - Brazzaville' },
                { label: 'Congo - Kinshasa', value: 'Congo - Kinshasa' },
                { label: 'Côte d’Ivoire', value: 'ivory-coast' },
                { label: 'Djibouti', value: 'Djibouti' },
                { label: 'Egypt', value: 'Egypt' },
                { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
                { label: 'Eritrea', value: 'Eritrea' },
                { label: 'Ethiopia', value: 'Ethiopia' },
                { label: 'Gabon', value: 'Gabon' },
                { label: 'Gambia', value: 'Gambia' },
                { label: 'Ghana', value: 'Ghana' },
                { label: 'Guinea', value: 'Guinea' },
                { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
                { label: 'Kenya', value: 'Kenya' },
                { label: 'Lesotho', value: 'Lesotho' },
                { label: 'Liberia', value: 'Liberia' },
                { label: 'Libya', value: 'Libya' },
                { label: 'Madagascar', value: 'Madagascar' },
                { label: 'Malawi', value: 'Malawi' },
                { label: 'Mali', value: 'Mali' },
                { label: 'Mauritania', value: 'Mauritania' },
                { label: 'Mauritius', value: 'Mauritius' },
                { label: 'Mayotte', value: 'Mayotte' },
                { label: 'Morocco', value: 'Morocco' },
                { label: 'Mozambique', value: 'Mozambique' },
                { label: 'Namibia', value: 'Namibia' },
                { label: 'Niger', value: 'Niger' },
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'Rwanda', value: 'Rwanda' },
                { label: 'Réunion', value: 'Réunion' },
                { label: 'Saint Helena', value: 'Saint Helena' },
                { label: 'Senegal', value: 'Senegal' },
                { label: 'Seychelles', value: 'Seychelles' },
                { label: 'Sierra Leone', value: 'Sierra Leone' },
                { label: 'Somalia', value: 'Somalia' },
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Sudan', value: 'Sudan' },
                { label: 'Swaziland', value: 'Swaziland' },
                { label: 'São Tomé and Príncipe', value: 'São Tomé and Príncipe' },
                { label: 'Tanzania', value: 'Tanzania' },
                { label: 'Togo', value: 'Togo' },
                { label: 'Tunisia', value: 'Tunisia' },
                { label: 'Uganda', value: 'Uganda' },
                { label: 'Western Sahara', value: 'Western Sahara' },
                { label: 'Zambia', value: 'Zambia' },
                { label: 'Botswana', value: 'Zimbabwe' },
              ],
            },
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 1
              }
              return true;
            },
          },
          {
            key: 'juristrictions_1_additional_country_tax_nr',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Additional Country Tax Number',
              required: false,
            },
            
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 1
              }
              return true;
            },
          },
// When VALUE 2 selected
          {
            key: 'juristrictions_2_country',
            type: 'select',
            templateOptions: {
              label: 'Additional Country',
              options: [
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Algeria', value: 'algeria' },
                { label: 'Angola', value: 'angola' },
                { label: 'Benin', value: 'Benin' },
                { label: 'Burkina Faso', value: 'Burkina Faso' },
                { label: 'Burundi', value: 'Burundi' },
                { label: 'Cameroon', value: 'Cameroon' },
                { label: 'Cape Verde', value: 'Cape Verde' },
                { label: 'Central African Republic', value: 'Central African Republic' },
                { label: 'Chad', value: 'Chad' },
                { label: 'Comoros', value: 'Comoros' },
                { label: 'Congo - Brazzaville', value: 'Congo - Brazzaville' },
                { label: 'Congo - Kinshasa', value: 'Congo - Kinshasa' },
                { label: 'Côte d’Ivoire', value: 'ivory-coast' },
                { label: 'Djibouti', value: 'Djibouti' },
                { label: 'Egypt', value: 'Egypt' },
                { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
                { label: 'Eritrea', value: 'Eritrea' },
                { label: 'Ethiopia', value: 'Ethiopia' },
                { label: 'Gabon', value: 'Gabon' },
                { label: 'Gambia', value: 'Gambia' },
                { label: 'Ghana', value: 'Ghana' },
                { label: 'Guinea', value: 'Guinea' },
                { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
                { label: 'Kenya', value: 'Kenya' },
                { label: 'Lesotho', value: 'Lesotho' },
                { label: 'Liberia', value: 'Liberia' },
                { label: 'Libya', value: 'Libya' },
                { label: 'Madagascar', value: 'Madagascar' },
                { label: 'Malawi', value: 'Malawi' },
                { label: 'Mali', value: 'Mali' },
                { label: 'Mauritania', value: 'Mauritania' },
                { label: 'Mauritius', value: 'Mauritius' },
                { label: 'Mayotte', value: 'Mayotte' },
                { label: 'Morocco', value: 'Morocco' },
                { label: 'Mozambique', value: 'Mozambique' },
                { label: 'Namibia', value: 'Namibia' },
                { label: 'Niger', value: 'Niger' },
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'Rwanda', value: 'Rwanda' },
                { label: 'Réunion', value: 'Réunion' },
                { label: 'Saint Helena', value: 'Saint Helena' },
                { label: 'Senegal', value: 'Senegal' },
                { label: 'Seychelles', value: 'Seychelles' },
                { label: 'Sierra Leone', value: 'Sierra Leone' },
                { label: 'Somalia', value: 'Somalia' },
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Sudan', value: 'Sudan' },
                { label: 'Swaziland', value: 'Swaziland' },
                { label: 'São Tomé and Príncipe', value: 'São Tomé and Príncipe' },
                { label: 'Tanzania', value: 'Tanzania' },
                { label: 'Togo', value: 'Togo' },
                { label: 'Tunisia', value: 'Tunisia' },
                { label: 'Uganda', value: 'Uganda' },
                { label: 'Western Sahara', value: 'Western Sahara' },
                { label: 'Zambia', value: 'Zambia' },
                { label: 'Botswana', value: 'Zimbabwe' },
              ],
            },
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 2
              }
              return true;
            },
          },
          {
            key: 'juristrictions_2_additional_country_tax_nr',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Additional Country Tax Number',
              required: false,
            },
            
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 2
              }
              return true;
            },
          },
          {
            key: 'juristrictions_3_country',
            type: 'select',
            templateOptions: {
              label: 'Additional Country',
              options: [
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Algeria', value: 'algeria' },
                { label: 'Angola', value: 'angola' },
                { label: 'Benin', value: 'Benin' },
                { label: 'Burkina Faso', value: 'Burkina Faso' },
                { label: 'Burundi', value: 'Burundi' },
                { label: 'Cameroon', value: 'Cameroon' },
                { label: 'Cape Verde', value: 'Cape Verde' },
                { label: 'Central African Republic', value: 'Central African Republic' },
                { label: 'Chad', value: 'Chad' },
                { label: 'Comoros', value: 'Comoros' },
                { label: 'Congo - Brazzaville', value: 'Congo - Brazzaville' },
                { label: 'Congo - Kinshasa', value: 'Congo - Kinshasa' },
                { label: 'Côte d’Ivoire', value: 'ivory-coast' },
                { label: 'Djibouti', value: 'Djibouti' },
                { label: 'Egypt', value: 'Egypt' },
                { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
                { label: 'Eritrea', value: 'Eritrea' },
                { label: 'Ethiopia', value: 'Ethiopia' },
                { label: 'Gabon', value: 'Gabon' },
                { label: 'Gambia', value: 'Gambia' },
                { label: 'Ghana', value: 'Ghana' },
                { label: 'Guinea', value: 'Guinea' },
                { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
                { label: 'Kenya', value: 'Kenya' },
                { label: 'Lesotho', value: 'Lesotho' },
                { label: 'Liberia', value: 'Liberia' },
                { label: 'Libya', value: 'Libya' },
                { label: 'Madagascar', value: 'Madagascar' },
                { label: 'Malawi', value: 'Malawi' },
                { label: 'Mali', value: 'Mali' },
                { label: 'Mauritania', value: 'Mauritania' },
                { label: 'Mauritius', value: 'Mauritius' },
                { label: 'Mayotte', value: 'Mayotte' },
                { label: 'Morocco', value: 'Morocco' },
                { label: 'Mozambique', value: 'Mozambique' },
                { label: 'Namibia', value: 'Namibia' },
                { label: 'Niger', value: 'Niger' },
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'Rwanda', value: 'Rwanda' },
                { label: 'Réunion', value: 'Réunion' },
                { label: 'Saint Helena', value: 'Saint Helena' },
                { label: 'Senegal', value: 'Senegal' },
                { label: 'Seychelles', value: 'Seychelles' },
                { label: 'Sierra Leone', value: 'Sierra Leone' },
                { label: 'Somalia', value: 'Somalia' },
                { label: 'South Africa', value: 'South Africa' },
                { label: 'Sudan', value: 'Sudan' },
                { label: 'Swaziland', value: 'Swaziland' },
                { label: 'São Tomé and Príncipe', value: 'São Tomé and Príncipe' },
                { label: 'Tanzania', value: 'Tanzania' },
                { label: 'Togo', value: 'Togo' },
                { label: 'Tunisia', value: 'Tunisia' },
                { label: 'Uganda', value: 'Uganda' },
                { label: 'Western Sahara', value: 'Western Sahara' },
                { label: 'Zambia', value: 'Zambia' },
                { label: 'Botswana', value: 'Zimbabwe' },
              ],
            },
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 2
              }
              return true;
            },
          },
          {
            key: 'juristrictions_3_additional_country_tax_nr',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Additional Country Tax Number',
              required: false,
            },
            
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.juristrictions) {
                return formState.mainModel.juristrictions !== 2
              }
              return true;
            },
          },
        ],
      },

      {
        templateOptions: { label: 'Step 2' },
        fieldGroup: [
          {
            key: 'phone_num',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Phone number',
              required: true,
            },
          },
          {
            key: 'gender',
            type: 'select',
            templateOptions: {
              label: 'Select gender',
              options: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ],
              required: true,
            },
          },
          {
            key: 'maritial_status',
            type: 'select',
            templateOptions: {
              label: 'Marital status',
              options: [
                { label: 'Single', value: 'single' },
                { label: 'Married in-community', value: 'married-in-community' },
                { label: 'Married out-of-community', value: 'married-out-of-community' },
                { label: 'Married out-of-community with accrual', value: 'married-out-of-community-w-accural' },
              ],
              required: true,
            },
          },
          {
            key: 'birth_date',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Birth date',
              required: true,
            },
          },
          {
            key: 'palce_of_birth',
            type: 'input',
            templateOptions: {
              label: 'Place of birth',
              required: true,
            },
          },
          {
            key: 'street_address',
            type: 'input',
            templateOptions: {
              label: 'Street Address',
              required: true,
            },
          },
          {
            key: 'unit_num',
            type: 'input',
            templateOptions: {
              label: 'Building / Unit No.',
              required: true,
            },
          },
        ],
      },
      {
        templateOptions: { label: 'Step 3' },
        fieldGroup: [
          {
            key: 'city',
            type: 'input',
            templateOptions: {
              label: 'City',
              required: true,
            },
          },
          {
            key: 'state_province',
            type: 'input',
            templateOptions: {
              label: 'State or Province',
              required: true,
            },
          },
          {
            key: 'country',
            type: 'input',
            templateOptions: {
              label: 'Country',
              required: true,
            },
          },
          {
            key: 'postal_address',
            type: 'input',
            templateOptions: {
              label: 'Postal Address',
              required: true,
            },
          },
          {
            key: 'confirm_postal',
            type: 'select',
            templateOptions: {
              label: 'Is the above address the same as your postal address?',
              options: [
                { label: 'Yes', value: 0 },
                { label: 'No', value: 1 },
              ],
              required: true,
            },
          },
        ],
      },
      {
        templateOptions: { label: 'Step 4' },
        fieldGroup: [
          {
            key: 'acc_holder_name',
            type: 'input',
            templateOptions: {
              label: 'Accountholder Name',
              required: true,
            },
          },
          {
            key: 'bank_name',
            type: 'input',
            templateOptions: {
              label: 'Bank Name',
              required: true,
            },
          },
          {
            key: 'account_number',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Bank Account Number',
              required: true,
            },
          },
          {
            key: 'branch_code',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Branch code',
              required: true,
            },
          },
          {
            key: 'occupation',
            type: 'input',
            templateOptions: {
              label: 'Occupation',
              required: true,
            },
          },
          {
            key: 'employer',
            type: 'input',
            templateOptions: {
              label: 'Name of company',
              required: true,
            },
          },
          {
            key: 'business_desc',
            type: 'input',
            templateOptions: {
              label: 'Business Description',
              required: true,
            },
          },
          {
            key: 'monthly_income',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Monthly Income',
              required: true,
            },
          },
          {
            key: 'other_investments',
            type: 'select',
            templateOptions: {
              label: 'Have you previously invested in or sent funds to any country other than South Africa?',
              options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ],
              required: true,
            },
          },
          {
            key: 'social_security',
            type: 'select',
            templateOptions: {
              type: 'number',
              label: 'Do you have a U.S. Social Security Number',
              options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ],
              required: true,
            },
          },
          {
            key: 'social_security_nr',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Social security number',
              required: false,
            },
            
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState` or `model
              if (formState.mainModel && formState.mainModel.social_security) {
                return formState.mainModel.social_security !== 'Yes'
              }
              return true;
            },
          },
          {
            key: 'pip_status',
            type: 'select',
            templateOptions: {
              type: 'number',
              label: 'Promonent influential (PIP) status',
              options: [
                { label: 'I am a PIP', value: 'yes-pip' },
                { label: 'I am an associate of a PIP', value: 'associate-pip' },
                { label: 'I am a family member of a PIP', value: 'family-pip' },
                { label: 'I am not a PIP', value: 'not-pip' },
              ],
              required: true,
            },
          },

        ],
      },
      {
        templateOptions: { label: 'Amost Done!' },
        fieldGroup: [
          {
            key: 'sda_fia',
            type: 'select',
            templateOptions: {
              label: 'SDA/FIA',
              options: [
                { label: 'SDA', value: 'sda' },
                { label: 'FIA', value: 'fia' },
              ],
              required: true,
            },
          },
          {
            key: 'capital_amount',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Starting Capital Amount',
              required: true,
            },
          },
          {
            key: 'utilize_amount',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Specify how much of your SDA or FIA you would like to utilize',
              required: true,
            },
          },
        ],
      },
    ],
  }];

  constructor(private http: HttpClient, public router: Router) {}

  public submit(data) {
    data.user_id = this.user_id
    data.email = this.user_email
    let token = window.localStorage.getItem('token');
    let formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    
    this.http.post(url.baseurl + '/validate/arb/register', data, formDataHeader).subscribe(
      (result) => {
        console.log("result", result);
        // if(result['hasError'] == false) this.router.navigateByUrl('/loggedin/arbitrage-form-two');
        if (result['hasError'] == false) this.router.navigateByUrl('/loggedin/arbitrage-form-two?id='+result['registered'].idNumber);
        // Else do something here :)

      })
    console.warn(data);
  }
}
