/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as actions } from "Redux/Actions/Entity";
import { store } from "Redux/Store";

export default (params = {}) => {
  const { storeId } = params;
  if (!storeId) {
    throw new Error(
      "An error has occurred while Creating Redux State in asEntity HOC, asEntuty HOC require storeKey to create Redux State"
    );
  }

  return WrappedComponent => {
    class EntityComponent extends Component {
      get storeId() {
        return storeId;
      }

      get store() {
        return this.props.storeEntity;
      }

      componentDidMount() {
        if (
          process.env.NODE_ENV !== "development" &&
          Object.prototype.hasOwnProperty.call(store.getState().entity, storeId)
        ) {
          throw new Error(
            "An Error has occurred while Creating Redux State in asEntity HOC, asEntity HOC require Unique storeKey to create Redux State"
          );
        }
        this.props.register(storeId);
      }

      post = item => {
        this.props.post(this.storeId, item);
      };

      get = id => {
        this.props.get(this.storeId, id);
      };

      put = item => {
        this.props.put(this.storeId, item);
      };

      render() {
        const providedHOF = {
          post: this.post,
          get: this.get,
          put: this.put
        };
        const providedProps = {
          loading: this.props.loading,
          error: this.props.error
        };
        if (this.store) {
          return (
            <WrappedComponent
              {...this.props}
              {...providedProps}
              {...providedHOF}
            />
          );
        }
        return null;
      }
    }

    const mapStateToProps = store => {
      return {
        storeEntity: store.entity[params.storeId]
          ? { ...store.entity[params.storeId] }
          : null
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        ...bindActionCreators(actions, dispatch)
      };
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(EntityComponent);
  };
};
