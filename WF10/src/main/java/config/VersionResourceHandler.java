package config;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.application.ResourceWrapper;


public class VersionResourceHandler extends ResourceHandlerWrapper {
  private ResourceHandler wrapped;

  public VersionResourceHandler(ResourceHandler wrapped) {
    this.wrapped = wrapped;
  }

  @Override
  public Resource createResource(String resourceName) {
    return createResource(resourceName, null, null);
  }

  @Override
  public Resource createResource(String resourceName, String libraryName) {
    return createResource(resourceName, libraryName, null);
  }

  @Override
  public Resource createResource(String resourceName, String libraryName, String contentType) {
    final Resource resource = super.createResource(resourceName, libraryName, contentType);

    if (resource == null) {
      return null;
    }

    return new ResourceWrapper() {

      @Override
      public String getRequestPath() {
        return super.getRequestPath();
      }

      @Override // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
      public String getResourceName() {
        return resource.getResourceName();
      }

      @Override // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
      public String getLibraryName() {
        return resource.getLibraryName();
      }

      @Override // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
      public String getContentType() {
        return resource.getContentType();
      }

      @Override
      public Resource getWrapped() {
        return resource;
      }
    };
  }

  @Override
  public ResourceHandler getWrapped() {
    return wrapped;
  }

}
