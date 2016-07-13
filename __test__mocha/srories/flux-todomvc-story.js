var todoHomePage = require('../page/flux-todomvc-page');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe ('Todo list : Page', function(){

  var newList = ['Add 1','Add 2','Add 3','Add 4','Add 5','Add 6','Add 7'];

  before( function(){
    browser.ignoreSynchronization = true;
    todoHomePage.go();
  }); 

  it('should have proper title', function() {
    var pageTitle = todoHomePage.getPageTitle;
    expect(pageTitle).to.eventually.equal('todos');
    browser.wait(3000);
  });

  it('Should have TextBox', function() {
    var todoEntry = todoHomePage.getTextBox;
    expect(todoEntry.isPresent()).to.eventually.equal(true);
    browser.wait(3000);
  });

  it('Should have a placeholder in Textbox "What needs to be done?"', function() {

    var todoEntry = todoHomePage.getTextBox;
    //console.log(todoEntry);
    //console.log(todoEntry.getAttribute('placeholder'));
    expect(todoEntry.getAttribute('placeholder')).to.eventually.equal('What needs to be done?');
    browser.wait(3000);
  });

  //describe('Where there is no item')
  //describe('Where there are item present')
  it('Should not have option to mark/unmark all lists', function() {
      expect(todoHomePage.selectAllOption.isPresent()).to.eventually.equal(false);
    
  });

  it('Should list todo items', function() {

    var allList  = todoHomePage.getAllList;
    todoHomePage.addNewList('Add 1');
    expect(todoHomePage.getListLabel(allList.last()).getText()).to.eventually.equal('Add 1');
  });

  it('Should mark first todo item', function() {
      
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();
    firstList.getAttribute('class').then(function(className){
      expect(className).to.contain('completed');      
    })
  });

  it('Should unmark one Todo list', function() {
      
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();
    firstList.getAttribute('class').then(function(className){
      expect(className).to.not.contain('completed'); 
      browser.wait(3000);
    })
  });
  
  it('Should be able to edit todo item', function(){
    var firstList = todoHomePage.getAllList.get(0),
        todoLabel = firstList.element(by.tagName('label'));

    browser.actions().doubleClick(todoLabel).perform();
    var editInput = firstList.element(by.css('.edit'));

    expect(editInput.isPresent()).to.eventually.equal(true);
        
    //browser.pause();   

  });
  it('Should be able to edit and save new text on edit mode', function(){
    var firstList = todoHomePage.getAllList.get(0),
        editInput = firstList.element(by.css('.edit'));

    editInput.clear().sendKeys('New Edited Text').sendKeys(protractor.Key.ENTER);

    var todoLabel = firstList.element(by.tagName('label'));

    expect(todoLabel.getText()).to.eventually.equal('New Edited Text');

  });


  it('Should Delete one Todo list', function() {
    var allList  = todoHomePage.getAllList,
    thisDeleteButton = todoHomePage.getDeleteButton(allList.get(0));
    //console.log(thisDeleteButton);
    browser.executeScript("arguments[0].click();", thisDeleteButton.getWebElement());
  });

  it('Should have correct list counter', function() {
    todoHomePage.addMoreLists(newList);
    //expect(todoHomePage.getTodoCount.then( r => Number(r) )).to.eventually.equal(todoHomePage.getUncompletedList.count().then( r => Number(r) ));
    todoHomePage.getUncompletedList.count().then(function(count){
      expect(todoHomePage.getTodoCount.then( r => Number(r) )).to.eventually.equal(count);
    });
  });

  it('Should have option to mark/unmark all lists', function() {
      expect(todoHomePage.selectAllOption.isPresent()).to.eventually.equal(true);
  });

  it('Should not have option to clear completed todo Lists', function(){
    expect(todoHomePage.getClearCompletedButton.isPresent()).to.eventually.equal(false);
  });

  it('Should mark all lists completed', function() {
    todoHomePage.selectAllOption.click();
    todoHomePage.getCompletedList.count().then(function(count){
      expect(todoHomePage.getAllList.count())
      .to.eventually.equal(count);
    });
  });

  it('Should have option to clear completed todo Lists', function(){
    expect(todoHomePage.getClearCompletedButton.isPresent()).to.eventually.equal(true);
  });

  it('Should unmark all lists completed', function() {
      todoHomePage.selectAllOption.click();
    todoHomePage.getUncompletedList.count().then(function(count){
      expect(todoHomePage.getAllList.count())
        .to.eventually.equal(count);
    });

  });

  it('should display numbers of completed list', function(){
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();
    //browser.pause();
    var completedNumbers = todoHomePage.getCompletedNumber;
    expect(completedNumbers.getText()).to.eventually.equal('1');

  });

  it('Should Delete all completed todo List', function(){
    var selectedList = todoHomePage.getCompletedList.get(0);
    todoHomePage.getClearCompletedButton.click();

    expect(selectedList.isPresent()).to.eventually.equal(false);

  });

});
