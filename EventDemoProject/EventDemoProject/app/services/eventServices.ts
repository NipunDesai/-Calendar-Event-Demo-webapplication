/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />


interface IeventServices {
    
    getAllEventList: () => void;
    createNewEvent: (event: Model.Event) => void;
    eventChange: (eventJoinAc, eventId)=>void;
}

class eventServices {
    static serviceId: string = "eventServices";
    public getEventList;
    private $resource;
    private $q;
    public createEvent;
    public eventSelection;
   
    constructor($resource: ng.resource.IResourceService, $q: ng.IQService) {
        this.$resource = $resource;
        this.$q = $q;
        this.getEventList = $resource(apiPaths.getAllEventList);
        this.createEvent = $resource(apiPaths.createNewEvent);
        this.eventSelection = $resource(apiPaths.eventChange + '/:eventJoinAc/:eventId', { eventJoinAc: '@eventJoinAc', eventId: '@eventId' }, { save: { method: "POST" } });
    }

    getAllEventList() {
        return this.getEventList.query().$promise;
    }

    createNewEvent(event) {
        return this.createEvent.save(event).$promise;
    }

    eventChange(eventJoinAc,eventId) {
        return this.eventSelection.save({ eventJoinAc: eventJoinAc, eventId: eventId}).$promise;
    }
}

app.service('eventServices', ['$resource', '$q', ($resource, $q) => {
    return new eventServices($resource, $q);
}]);