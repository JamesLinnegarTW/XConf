import WorldViewMediator from '../views/WorldViewMediator';
import ChairViewMediator from '../views/ChairViewMediator';
import ConsultantViewMediator from '../views/ConsultantViewMediator';
import WallViewMediator from '../views/WallViewMediator';

export default class ViewMediatorFactory {
    getMediator(model) {
        switch (model.className) {
            case 'World':
                return new WorldViewMediator(model);
            case 'Chair':
                return new ChairViewMediator(model);
            case 'Consultant':
                return new ConsultantViewMediator(model);
            case 'Wall':
                return new WallViewMediator(model);
            default:
                throw new Error("no mediator for " + renderObject.className);
        }
    }
}
