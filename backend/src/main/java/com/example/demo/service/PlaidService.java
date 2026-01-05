package com.example.demo.service;

import com.plaid.client.request.PlaidApi;
import com.plaid.client.model.ItemPublicTokenExchangeRequest;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;

import java.io.IOException;

import org.springframework.stereotype.Service;
import retrofit2.Response;


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

    

    

}