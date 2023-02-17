package com.loofreactapp.data;

import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import com.loofreactapp.BR;

public class UserStatus extends BaseObservable {
    private String appStatus;

    public UserStatus(String status){
        this.appStatus = status;
    }

    @Bindable
    public String getAppStatus(){
        return appStatus;
    }

    public void setAppStatus(String appStatus){
        this.appStatus = appStatus;
        notifyPropertyChanged(BR.appStatus);
    }
}
