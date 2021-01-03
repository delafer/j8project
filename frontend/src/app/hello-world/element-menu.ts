export class ElementMenu {
    //string - строка
    //number - число
    //Date - дата
    //boolean - принимает значение "true" (правда) или "false" (ложь)
    //Object - любой объект
    //Имя класса - конкретный какой-то класс
    //any - может хранить что-угодно
    //если после типа идут [] - значит это массив из этих типов, например
    //string[] - массив текстовых строк
    //number[] - массив чисел
    //тип указывается после имени переменной, через двоеточие, например
    //let myVar: number

    link: string;
    name: string;
    tooltip: string;

    constructor(link: string, name: string, tooltip?: string ) {
        this.link = link;
        this.name = name;
        this.tooltip = tooltip;
    }
}


// let myObject = new ElementMenu ();

