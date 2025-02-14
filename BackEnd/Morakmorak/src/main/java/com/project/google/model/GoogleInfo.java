package com.project.google.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoogleInfo {
	private String sub;             
    private String name;            
    private String givenName;       
    private String familyName;      
    private String picture;        
    private String email;         
    private boolean emailVerified;  
}
