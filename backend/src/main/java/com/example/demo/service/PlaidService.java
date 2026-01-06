package com.example.demo.service;

import com.plaid.client.request.PlaidApi;
import com.plaid.client.model.ItemPublicTokenExchangeRequest;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;
import com.plaid.client.model.LinkTokenCreateRequestUser;
import com.plaid.client.model.Products;
import com.plaid.client.model.LinkTokenCreateRequest;
import com.plaid.client.model.LinkTokenCreateResponse;

import java.io.IOException;

import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.util.Arrays;

@Service
public class PlaidService {
    private final PlaidApi plaidApi;
    
    //this is the contructor for the spring-boot framework
    public PlaidService(PlaidApi plaidApi) {
        this.plaidApi = plaidApi;
    }

    public void exchangeAndStore(String publicToken, String userid) throws IOException {
        //create plaid specific request object that is sent
        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(publicToken);

        //this stores the reponse that the plaid server sends
        Response<ItemPublicTokenExchangeResponse> response = plaidApi.itemPublicTokenExchange(request).execute();

    }

    public String createLinkToken(String userId) throws IOException{
        //created object for user
        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser().clientUserId(userId);

        //created request with user object
        LinkTokenCreateRequest request = new LinkTokenCreateRequest().user(user).clientName("Syn-napse").products(Arrays.asList(Products.TRANSACTIONS));

        //executed request
        Response<LinkTokenCreateResponse> response = plaidApi.linkTokenCreate(request).execute();  
        
        //returning value
        if (response.isSuccessful() && response.body() != null) {
            return response.body().getLinkToken();
        } else {
            //showing error
            throw new RuntimeException("failed to create link token: " + response.errorBody().string());
        }
    }

    

    

}