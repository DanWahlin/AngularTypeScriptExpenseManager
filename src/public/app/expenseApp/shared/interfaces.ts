///<reference path="../../../../../tools/typings/tsd.d.ts" />
///<reference path="../../../../../tools/typings/expenseApp.d.ts" />

module expenseApp.shared {

    export interface IState {
        title: string;
    }
    
    export interface IPagedResult {
        totalRecords: number;
        results: IEmployee[];
    }
    
    export interface IName {
        title: string;
        first: string;
        last: string;
    }
    
    export interface ILocation {
        street: string;
        city: string;
        state: string;
        zip: string;
    }
    
    export interface IPicture {
        large: string;
        medium: string;
        thumbnail: string;
    }

    export interface IEmployee {
        id: number;
        gender: string;
        name: IName;
        location: ILocation;
        email: string;
        username?: string;
        password?: string;
        phone?: string;
        cell?: string;
        picture?: IPicture;
        nationality?: string;
        expenses?: IExpense[];
        expensesTotal?: number;
    }
    
    export interface IRouteParamsServiceWithRedirect extends ng.route.IRouteParamsService {
        redirect: boolean;
    }

    export interface IExpense {
      id: number;
      title: string;
      expenseCategory: string;
      created: string;
      amount: number;
    }

    export interface IHttpPromiseCallbackErrorArg extends ng.IHttpPromiseCallbackArg<any> {
         message: string;
    }


}
