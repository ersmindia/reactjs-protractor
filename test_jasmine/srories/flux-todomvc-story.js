var todoHomePage = require('../page/flux-todomvc-page');
describe ('Todo list : Page', function(){

  var newList = ['Add 1','Add 2','Add 3','Add 4','Add 5','Add 6','Add 7'];

  beforeAll( function(){
    browser.ignoreSynchronization = true;
    todoHomePage.go();
  }); 

  it('should have proper title', function() {
    var pageTitle = todoHomePage.getPageTitle;
    expect(pageTitle).toBe('todos');
  });

  it('Should have TextBox', function() {
    var todoEntry = todoHomePage.getTextBox;
    expect(todoEntry.isPresent()).toBe(true)
  });

  it('Should have a placeholder in Textbox "What needs to be done?"', function() {

    var todoEntry = todoHomePage.getTextBox;
    //console.log(todoEntry);
    //console.log(todoEntry.getAttribute('placeholder'));
    expect(todoEntry.getAttribute('placeholder')).toBe('What needs to be done?');
  });

  //describe('Where there is no item')
  //describe('Where there are item present')
  it('Should not have option to mark/unmark all lists', function() {
      expect(todoHomePage.selectAllOption.isPresent()).toBe(false);
    
  });

  it('Should list todo items', function() {

    var allList  = todoHomePage.getAllList;
    todoHomePage.addNewList('Add 1');
    expect(todoHomePage.getListLabel(allList.last()).getText()).toBe('Add 1');
  });

  it('Should mark first todo item', function() {
      
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();

    expect(firstList.getAttribute('class')).toMatch('completed');      
  });

  it('Should unmark one Todo list', function() {
      
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();

    expect(firstList.getAttribute('class')).not.toMatch('completed'); 
     
  });
  
  it('Should be able to edit todo item', function(){
    var firstList = todoHomePage.getAllList.get(0),
        todoLabel = firstList.element(by.tagName('label'));

    browser.actions().doubleClick(todoLabel).perform();
    var editInput = firstList.element(by.css('.edit'));

    expect(editInput.isPresent()).toBe(true);
        
    //browser.pause();   

  });
  it('Should be able to edit and save new text on edit mode', function(){
    var firstList = todoHomePage.getAllList.get(0),
        editInput = firstList.element(by.css('.edit'));

    editInput.clear().sendKeys('New Edited Text').sendKeys(protractor.Key.ENTER);

    var todoLabel = firstList.element(by.tagName('label'));

    expect(todoLabel.getText()).toBe('New Edited Text');

  });


  it('Should Delete one Todo list', function() {
    var allList  = todoHomePage.getAllList,
    thisDeleteButton = todoHomePage.getDeleteButton(allList.get(0));
    //console.log(thisDeleteButton);
    browser.executeScript("arguments[0].click();", thisDeleteButton.getWebElement());
  });

  it('Should have correct list counter', function() {
    todoHomePage.addMoreLists(newList);
    expect(todoHomePage.getTodoCount.then( r => Number(r) ))
      .toBe(todoHomePage.getUncompletedList.count().then( r => Number(r) ));
  });

  it('Should have option to mark/unmark all lists', function() {
      expect(todoHomePage.selectAllOption.isPresent()).toBe(true);
  });

  it('Should not have option to clear completed todo Lists', function(){
    expect(todoHomePage.getClearCompletedButton.isPresent()).toBe(false);
  });

  it('Should mark all lists completed', function() {
      todoHomePage.selectAllOption.click();
      expect(todoHomePage.getAllList.count())
        .toBe(todoHomePage.getCompletedList.count());
      
  });

  it('Should have option to clear completed todo Lists', function(){
    expect(todoHomePage.getClearCompletedButton.isPresent()).toBe(true);
  });

  it('Should unmark all lists completed', function() {
      todoHomePage.selectAllOption.click();
      expect(todoHomePage.getAllList.count())
        .toBe(todoHomePage.getUncompletedList.count()); 

  });

  it('should display numbers of completed list', function(){
    var firstList = todoHomePage.getAllList.get(0),
        selectOpion = firstList.element(by.css('.toggle'));
    
    selectOpion.click();
    //browser.pause();
    var completedNumbers = todoHomePage.getCompletedNumber;
    expect(completedNumbers.getText()).toBe('1');

  });

  it('Should Delete all completed todo List', function(){
    var selectedList = todoHomePage.getCompletedList.get(0);
    todoHomePage.getClearCompletedButton.click();

    expect(selectedList.isPresent()).toBe(false);

  });

});
