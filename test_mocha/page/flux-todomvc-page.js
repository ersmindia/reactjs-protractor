var Page = require('astrolabe').Page;
module.exports = Page.create({

  url: {
    value: 'http://localhost:5530'
  },

  getPageTitle: {
    get: function() {
      return element(by.css('#header h1')).getText();
    }
  },
  getTextBox: {
    get: function() {
      return element(by.id('new-todo'));
    }

  },
  getAllList:{
    get: function() {
      return element.all(by.css('#todo-list li'));
    }

  },
  getListLabel:{
    value: function(elem) {
      return elem.element(by.tagName('label'));
    }
  },
  getDeleteButton: {
    value: function(elem) {
      return elem.element(by.css('.destroy'));
    }
  },
  getTodoCount:{
    get: function(){
        return element(by.id('todo-count')).element(by.tagName('strong')).getText();
    }
  },
  getUncompletedList:{
    get: function() {
      return element.all(by.css('#todo-list li:not(.completed)'));
    }

  },
  addNewList: {
    value: function(todoText){
      this.getTextBox.sendKeys(todoText);
      this.getTextBox.sendKeys(protractor.Key.ENTER);
    }

  },
  addMoreLists:{
    value: function(listArray){
        var page = this;
        listArray.forEach(function(listText, index){
          page.getTextBox.sendKeys(listText);
          page.getTextBox.sendKeys(protractor.Key.ENTER);
        });
    }

  },
  selectAllOption:{
    get: function(){
        return element(by.id('toggle-all'));

    }
  },
  getCompletedList:{
    get: function(){
      return element.all(by.css('#todo-list li.completed .toggle'));
    }
  },
  getClearCompletedButton:{
    get: function() {
      return element(by.css('#clear-completed'));

    }
  },
  getCompletedNumber:{
    get: function() {
      return element.all(by.css('#clear-completed span')).get(1);

    }

  }

}); 
