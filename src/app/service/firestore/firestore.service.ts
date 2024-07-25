import { inject, Injectable } from "@angular/core";
import {
  collection,
  collectionData,
  FieldPath,
  Firestore,
  orderBy,
  OrderByDirection,
  query,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  where,
  WhereFilterOp,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface IWhereOptions {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
}

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  collectionData(
    collectionName: string,
    orderByOptions?: {
      fieldPath: string | FieldPath;
      directionStr?: OrderByDirection;
    }[],
    whereOptions?: IWhereOptions[]
  ): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const queryOptions: (
      | QueryOrderByConstraint
      | QueryFieldFilterConstraint
    )[] = [];
    orderByOptions &&
      orderByOptions.forEach((option) => {
        queryOptions.push(orderBy(option.fieldPath, option.directionStr));
      });
    whereOptions &&
      whereOptions.forEach((option) => {
        queryOptions.push(where(option.fieldPath, option.opStr, option.value));
      });
    const queryRef = query(collectionRef, ...queryOptions);
    return collectionData(queryRef, { idField: "id" }) as Observable<any[]>;
  }
}
