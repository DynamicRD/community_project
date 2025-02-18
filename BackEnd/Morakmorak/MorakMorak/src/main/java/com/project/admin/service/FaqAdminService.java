package com.project.admin.service;

import java.util.List;

import com.project.admin.model.FaqAdmin;

public interface FaqAdminService {
	List<FaqAdmin> getFaqs();
    void addFaq(FaqAdmin faq);
    void updateFaq(FaqAdmin faq);
    void deleteFaq(Long id);
}
