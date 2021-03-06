package com.tecla5.chat;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

// 1. Import the plugin class
import com.microsoft.codepush.react.CodePush;

import co.apptailor.googlesignin.RNGoogleSigninModule; // <--- import
import co.apptailor.googlesignin.RNGoogleSigninPackage;  // <--- import

public class MainActivity extends ReactActivity {
    
    // 2. Define a private field to hold the CodePush runtime instance
    private CodePush _codePush;
    
    // 3. Override the getJSBundleFile method in order to let
    // the CodePush runtime determine where to get the JS
    // bundle location from on each app start
    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl(); //this._codePush.getBundleUrl("index.android.bundle");
    }
    

    // add this method inside your activity class
    @Override
    public void onActivityResult(int requestCode, int resultCode, android.content.Intent data) {
        if (requestCode == RNGoogleSigninModule.RC_SIGN_IN) {
            RNGoogleSigninModule.onActivityResult(data);
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
            
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "chat";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        // 4. Instantiate an instance of the CodePush runtime, using the right deployment key. If you don't
        // already have it, you can run "code-push deployment ls <appName> -k" to retrieve your key.
        //this._codePush = new CodePush("NJVY8i0yej7TrSoOgAfspqjtPj9EV1iv8a83g", this, BuildConfig.DEBUG);

        // 5. Add the CodePush package to the list of existing packages
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new VectorIconsPackage(),
            new ReactMaterialKitPackage(),
            //new RNGoogleSigninPackage(), 
            new RNGoogleSigninPackage(this), // <------ add this line to yout MainActivity class            
            new CodePush("NJVY8i0yej7TrSoOgAfspqjtPj9EV1iv8a83g", this, BuildConfig.DEBUG) //this._codePush.getReactPackage()
        );                
    }
}
