import WorldViewMediator from '../views/WorldViewMediator';
import ChairViewMediator from '../views/ChairViewMediator';
import ConsultantViewMediator from '../views/ConsultantViewMediator';

export default class ViewMediatorFactory {
    getMediator(model) {
        switch (model.className) {
            case 'World':
                return new WorldViewMediator(model);
            case 'Chair':
                return new ChairViewMediator(model);
            case 'Consultant':
                return new ConsultantViewMediator(model);
            default:
                throw new Error("no mediator for " + renderObject.className);
        }
    }
}
