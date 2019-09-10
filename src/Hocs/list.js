import React from "react";
import { connect } from "react-redux";
import { Creators as ListActions } from "Redux/Actions/List";
import { store } from "Redux/Store";

export default (Configs = {}) => {
  const { storeId } = Configs;

  // If storeId not found throw error
  if (!storeId) {
    throw new Error(
      "An error has occurred while Creating Redux State in asList HOC, asList HOC require storeId to create Redux State"
    );
  }

  // Return Wrapped Component
  return Component => {
    class ListComponent extends React.Component {
      get storeId() {
        return storeId;
      }

      get store() {
        return this.props.items;
      }


      componentDidMount() {
        // If storeId duplicated throw error
        if (
          process.env.NODE_ENV !== "development" &&
          store
            .getState()
            .toJS()
            .list.hasOwnProperty(this.storeId)
        ) {
          throw new Error(
            "An Error has occurred while Creating Redux State in asList HOC, asList HOC require Unique storeKey to create Redux State"
          );
        }

        //OR check if store not created then register, So all components use Hoc with the same key will use same state
        this.props.register(this.storeId);
      }

      get = data => {
        this.props.get(this.storeId, data);
      };

      put = data => {
        this.props.put(this.storeId, data);
      };

      delete = data => {
        this.props.delete(this.storeId, data);
      };

      render() {
        const providedHOF = {
          get: this.get,
          put: this.put,
          delete: this.delete
        };

        const providedProps = {
          loading: this.props.loading,
          list: this.props.items,
          error: this.props.error,
          count: this.props.count
        };

        if (this.store) {
          return (
            <Component {...this.props} {...providedProps} {...providedHOF} />
          );
        }
        return null;
      }
    }

    ListComponent.propTypes = {
      register: PropTypes.func,
      get: PropTypes.func,
      put: PropTypes.func,
      delete: PropTypes.func
    };

    ListComponent.defaultProps = {};

    const mapStateToProps = store => ({ ...store.toJS().list[params.storeId] });

    const mapDispatchToProps = dispatch => ({
      register: id => dispatch(ListActions.register(id)),
      get: (id, data) => dispatch(ListActions.get(id, data)),
      put: (id, data) => dispatch(ListActions.put(id, data)),
      delete: (id, data) => dispatch(ListActions.delete(id, data))
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(ListComponent);
  };
};
