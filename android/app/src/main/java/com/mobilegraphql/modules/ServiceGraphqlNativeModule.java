package com.mobilegraphql.modules;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.InputType;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import java.util.Map;
import java.util.HashMap;
import com.google.gson.Gson;
import com.theman.GetLaunchDetailQuery;
import com.theman.GetLaunchesListQuery;
import com.theman.type.PatchSize;

import android.util.Log;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import okhttp3.OkHttpClient;

public class ServiceGraphqlNativeModule extends ReactContextBaseJavaModule{
    ServiceGraphqlNativeModule(ReactApplicationContext context){
        super(context);

    }

    private static ApolloClient apolloClient;

    private static ApolloClient getApolloClient() {
        if(apolloClient == null) {
            // Apollo Client
            String serverUrl = "https://apollo-fullstack-tutorial.herokuapp.com/";
            OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
            apolloClient = ApolloClient.builder()
                    .serverUrl(serverUrl)
                    .build();
        }
        return apolloClient;
    }

    @Override
    public String getName() {
        return "ServiceModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void fetchList(String afterVar, Callback launchesCallback) {

        Input<Integer> page = new Input<>(15, true);
        Input<PatchSize> mission = new Input<>(PatchSize.SMALL, true);
        Input<String> afterVal = new Input<>(afterVar, true);

        getApolloClient().query(new GetLaunchesListQuery(page, afterVal, mission))
                .enqueue(new ApolloCall.Callback<GetLaunchesListQuery.Data>() {
                    @Override
                    public void onResponse(@NonNull Response<GetLaunchesListQuery.Data> response) {
                        Log.e("ServiceModule", "Launches Query res: " + response.getData().launches().toString());
                        WritableMap data = new WritableNativeMap();
                        WritableArray launchesData = new WritableNativeArray();

                        data.putString("cursor", response.getData().launches().cursor());
                        data.putString("launches", response.getData().launches().launches().toString());

                        Log.d("ServiceModule", "data: " + data);

                        String dataToJson = new Gson().toJson(response.getData().launches());
                        
                        launchesCallback.invoke(dataToJson);
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.d("ServiceModule", "Launches Query error: " + e);

                        String dataErrorToJson = new Gson().toJson(e);
                        launchesCallback.invoke(dataErrorToJson);
                    }
                });
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void FetchDetail(String id, Callback launchCallback) {
        getApolloClient().query(new GetLaunchDetailQuery(id))
                .enqueue(new ApolloCall.Callback<GetLaunchDetailQuery.Data>() {
                    @Override
                    public void onResponse(@NonNull Response<GetLaunchDetailQuery.Data> response) {
                        Log.e("ServiceModule", "Launch Query res: " + response.getData().launch().toString());

                        String dataToJson = new Gson().toJson(response.getData().launch());

                        launchCallback.invoke(dataToJson);
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.d("ServiceModule", "Launch Query error: " + e);

                        String dataErrorToJson = new Gson().toJson(e);
                        launchCallback.invoke(dataErrorToJson);
                    }
                });
    }
}
