import { Injectable, inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { School } from "../../interfaces/school.model";
import { map, Observable } from "rxjs";

// Configuration constants
const COLLECTION_NAME = "schools";

@Injectable({
  providedIn: "root",
})
export class SchoolService {
  private firestore = inject(AngularFirestore);

  constructor() {}

  // Method to get all items from the collection
  getItems(): Observable<(School & { id: string })[]> {
    return this.firestore
      .collection<School>(COLLECTION_NAME)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }

  // Method to get a single item by ID
  getItem(schoolId: string): Observable<School | null> {
    return this.firestore
      .collection<School>(COLLECTION_NAME)
      .doc(schoolId)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          if (data) {
            return { ...data, id: action.payload.id } as School;
          } else {
            return null;
          }
        })
      );
  }

  // Method to create a new item
  createItem(school: School): Promise<any> {
    return this.firestore.collection<School>(COLLECTION_NAME).add(school);
  }

  // Method to update an existing item
  updateItem(id: string, school: School): Promise<void> {
    const { id: _, ...data } = school; // Remove the id from the object
    return this.firestore.doc<School>(`${COLLECTION_NAME}/${id}`).update(data);
  }

  // Method to delete an item by ID
  deleteItem(id: string): Promise<void> {
    return this.firestore.doc(`${COLLECTION_NAME}/${id}`).delete();
  }
}
