import { connect } from "vuex-connect";
import { actions } from '../store/actions';
import store from "../store";
import HomeContainer from "./HomeContainer.vue";

store.state.enthusiasm
function stateToProps() {
  return {
    enthusiasm: () => store.state.enthusiasm
  };
}
function actionsToProps() {
  return {
    ...actions,
    hoge: () => { debugger }
  };
}
const container = connect({
  stateToProps: {
    enthusiasm: (state: any) => state.enthusiasm
  },
  actionsToProps: {}
})('home', HomeContainer);
export default container;
