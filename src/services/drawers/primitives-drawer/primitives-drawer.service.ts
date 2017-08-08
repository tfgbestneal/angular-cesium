import { CesiumService } from '../../cesium/cesium.service';
import { BasicDrawerService } from '../basic-drawer/basic-drawer.service';

/**
 *  General primitives drawer responsible of drawing Cesium primitives.
 *  Drawers the handle Cesium primitives extend it.
 */
export abstract class PrimitivesDrawerService extends BasicDrawerService {
  private _show = true;
  private _primitiveCollectionWrap;
  protected _cesiumCollection: any;
  protected _propsAssigner: Function;

  constructor(private drawerType: any, private cesiumService: CesiumService) {
    super();
  }

  init() {
    console.log(this.drawerType);
    this._cesiumCollection = new this.drawerType();
    this._primitiveCollectionWrap = new Cesium.PrimitiveCollection();
    this._primitiveCollectionWrap.add(this._cesiumCollection);
    this.cesiumService.getScene().primitives.add(this._primitiveCollectionWrap);
  }

  add(cesiumProps: any, ...args): any {
    console.log(this._cesiumCollection);
    return this._cesiumCollection.add(cesiumProps);
  }

  update(entity: any, cesiumProps: any, ...args) {
    if (this._propsAssigner) {
      this._propsAssigner(entity, cesiumProps);
    }
    else {
      Object.assign(entity, cesiumProps);
    }
  }

  remove(entity: any) {
    this._cesiumCollection.remove(entity);
  }

  removeAll() {
    this._cesiumCollection.removeAll();
  }

  setShow(showValue: boolean) {
    this._show = showValue;
    this._primitiveCollectionWrap.show = showValue;
  }

  getShow(): boolean {
    return this._show;
  }
}