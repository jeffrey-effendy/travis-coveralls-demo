describe("TodoController", function() {
  
  var viewmodel;
  
  beforeEach(module('todoApp'));
  
  beforeEach(inject(function($controller) {
    viewmodel = $controller('todoController');
  }));
  
  it("should start with empty tasks", function() {
    expect(viewmodel.tasks.length).toBe(0);
  });
  
});