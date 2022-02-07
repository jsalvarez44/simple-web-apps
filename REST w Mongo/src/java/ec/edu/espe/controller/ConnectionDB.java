/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.controller;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.FindIterable;
 import com.mongodb.client.MongoClients;
 import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCursor;
 import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;

/**
 *
 * @author SEBASTIAN
 */
public class ConnectionDB {

    public ArrayList<String> getMedicines() {
        ConnectionString connectionString = new ConnectionString("mongodb://nayeli:nayeli06@mycluster-shard-00-00.rviiz.mongodb.net:27017,mycluster-shard-00-01.rviiz.mongodb.net:27017,mycluster-shard-00-02.rviiz.mongodb.net:27017/MedicineDB?ssl=true&replicaSet=atlas-1qbun3-shard-0&authSource=admin&retryWrites=true&w=majority");
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase("MedicineDB");
        ArrayList<String> results = new ArrayList();

        FindIterable<org.bson.Document> iterable = database.getCollection("Medicines").find();
        MongoCursor<org.bson.Document> cursor = iterable.iterator();
        
        while (cursor.hasNext())
            results.add(cursor.next().toJson());
        
        return results;
    }
}
