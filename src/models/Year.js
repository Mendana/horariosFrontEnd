import { Week } from './Week.js';
import { getISOWeek } from 'date-fns';

export class Year {
    constructor(year) {
        this.year = year;
        this.weeks = {}; //Clave: número de la semana
    }

    getWeekNumber(dia, mes, year) {
        const date = new Date(year, mes - 1, dia);
        return getISOWeek(date);
      }

    addSubject(subject) {
        const { dia, mes, year} = subject.day;
        const weekNumber = this.getWeekNumber(dia, mes, year);
        if (!this.weeks[weekNumber]) {
            this.weeks[weekNumber] = new Week(weekNumber, year);
        }
        this.weeks[weekNumber].addSubject(subject);
    }

    getWeek(weekNumber) {
        return this.weeks[weekNumber] || null;
    }

    getWeekStartDate(weekNumber) {
        const week = this.weeks[weekNumber];
        if (!week) return null;
      
        const days = week.getSortedDays();
        if (!days || days.length === 0) return null;


        const firstDay = days[0];
        
        if (!firstDay || !firstDay.weekDay || firstDay.dia === undefined || firstDay.mes === undefined) {
          return `Semana ${weekNumber}`;
        }

        return `${firstDay.weekDay} ${firstDay.dia}/${firstDay.mes}`;
      }
}