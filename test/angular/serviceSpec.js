describe("modelService", function() {
  
  var service;
  var httpBackend;
  
  beforeEach(module('todoApp'));
  
  beforeEach(inject(function(modelService, $httpBackend) {
    service = modelService;
    httpBackend = $httpBackend;
  }));
  
  it("should increase task and set description appropriately", function() {
    var mockTasks = [{ id:0, description:"first", createdAt:new Date() }];
    var url = "/api/todos";
    httpBackend.when('POST', url).respond({
      status: "ok",
      response:[
        {
          id: 1,
          description: "test",
          createdAt: new Date()
        }
      ]
    });
    service.addOneTask(mockTasks, "test").then(function(res){
      expect(res.length).toBe(1);
      expect(res[0].description).toBe("first");
      expect(res[1].description).toBe("test");
    });
    httpBackend.flush();
  });
  
}); 