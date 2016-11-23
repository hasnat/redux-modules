import React, { PropTypes } from 'react';
import { connectModule } from 'redux-modules';
import { compose, lifecycle } from 'recompose';
import module from './module';
import './App.css';

const PokemonMe = ({ actions, activePokemon = {}, ...props }) => (
  <div>
    <label>{activePokemon.name}</label>
    <img src={activePokemon.picture} />
    <button onClick={actions.fetch}>
      another one
    </button>
  </div>
);

PokemonMe.PropTypes = {
  actions: PropTypes.shape({
    fetch: PropTypes.func.isRequired,
  }),
  activePokemon: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    picture: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default compose(
  connectModule(module),
  lifecycle({
    componentWillMount() { this.props.actions.fetch(); }
  })
)(PokemonMe);
