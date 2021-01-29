# azure-multi-tenant-prototype

### Configuration for spa:
The configuration of SPA comes from the backend/API. This is done to reduce the number of build for the SPA. 
E.g, You want to change the client id for SPA, then you can just channge it in the API settings without rebuilding the SPA. However, if we have put the client id in environment class in SPA, then change in the client id requires you to rebuild the SPA. 

However, there is an exception here - The backend/API URL still remains in environment class in SPA for obvious reasons. Please see the screenshots below:

![image](https://user-images.githubusercontent.com/24998910/103150018-9d519200-4795-11eb-9845-1aff9e566392.png)
![image](https://user-images.githubusercontent.com/24998910/103150052-0df8ae80-4796-11eb-9236-0a77a933c93c.png)

